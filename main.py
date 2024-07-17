import io
import base64
from matplotlib.cm import ScalarMappable
import matplotlib.pyplot as plt

import numpy as np
import eel
import json
import os

import http.server
import threading

IS_DEV = False

# ########## BASIC FILE HANDLING FUNCTIONS


# Get database folder and root directory after distribution
def getRootDBPath():
    if IS_DEV:
        return os.path.abspath("./db") + "/"
    else:
        return os.path.join(os.path.dirname(__file__), "db") + "/"


# Save data to specified file
@eel.expose
def saveToJSONFile(jsonFileName, data):
    with open(getRootDBPath() + jsonFileName, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


# get data from specified file
@eel.expose
def getFromJSONFile(jsonFileName):
    try:
        with open(getRootDBPath() + jsonFileName, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data
    except FileNotFoundError:
        print("File not found")
        return None


# Remove Duplicate data, excluding recordtime from input history
@eel.expose
def removeDuplicateHistory(data, key_to_ignore="recordTime"):
    seen = set()
    result = []

    for item in data:
        # Create a frozenset of the dictionary items excluding the key to ignore
        item_to_check = frozenset((k, v)
                                  for k, v in item.items() if k != key_to_ignore)

        if item_to_check not in seen:
            seen.add(item_to_check)
            result.append(item)

    return result


# Update Input history by prepending specified data
@eel.expose
def updateInputHistory(newData):
    fileName = "inputs-history.json"
    # If data is said to be set empty
    if (newData == []):
        saveToJSONFile(fileName, [])
        return

    # Get existing data
    existingHistory = getFromJSONFile(fileName)

    # If file doesn't exist or it is empty
    if (existingHistory == None):
        saveToJSONFile(fileName, [newData])
        return

    # At last, prepend current data, remove duplicates if any, and save
    updatedHistory = [newData] + existingHistory
    updatedHistory = removeDuplicateHistory(updatedHistory)
    saveToJSONFile(fileName, updatedHistory)


# ########## AUDIO FILE HANDLING FUNCTIONS


@eel.expose
def saveSpectrogramImage(filename, frequency, samplingRate, duration, amplitude=0.5):

    # Generate time axis
    timeAxis = np.linspace(0, duration, int(
        samplingRate * duration), endpoint=False)

    # Generate the sinusoidal signal
    sinusoid = amplitude * np.sin(2 * np.pi * frequency * timeAxis)

    # Define spectrogram parameters
    window_length = 2048  # Window length in samples
    fft_length = 2048     # FFT length in samples
    hop_length = window_length // 2  # Hop length (50% overlap)

    # Apply windowing and compute FFT
    n_windows = (len(sinusoid) - window_length) // hop_length + 1
    spectrogram = np.zeros((fft_length // 2 + 1, n_windows))

    window = np.hanning(window_length)
    for i in range(n_windows):
        start = i * hop_length
        segment = sinusoid[start:start + window_length]
        windowed_segment = segment * window
        fft_segment = np.fft.rfft(windowed_segment, n=fft_length)
        spectrogram[:, i] = np.abs(fft_segment)

    # Convert to dB scale
    spectrogram_db = 20 * np.log10(spectrogram + 1e-8)

    # Time and frequency axes
    time_axis = np.arange(n_windows) * hop_length / samplingRate
    freq_axis = np.fft.rfftfreq(fft_length, d=1/samplingRate)

    # Plot the spectrogram without axes
    # Convert spectrogram to a byte array using a buffer
    buffer = io.BytesIO()
    plt.figure(figsize=(10, 6))
    plt.pcolormesh(time_axis, freq_axis, spectrogram_db, shading='nearest')
    plt.axis('off')
    plt.savefig(buffer, format='png', bbox_inches='tight', pad_inches=0)
    plt.close()
    buffer.seek(0)

    # Encode the byte array as base64 string
    encoded_image = base64.b64encode(buffer.read()).decode('utf-8')

    spectrogram_db = 20 * np.log10(np.abs(spectrogram + 1e-8))

    # Create colormap and normalization
    cmap = plt.cm.get_cmap('viridis')  # Choose a colormap (e.g., 'jet', 'plasma')
    norm = plt.Normalize(vmin=spectrogram_db.min(), vmax=spectrogram_db.max())

    # Create a ScalarMappable object for color-magnitude mapping
    sm = ScalarMappable(cmap=cmap, norm=norm)
    sm.set_array([])  # Set an empty array for color mapping

    # Extract color and magnitude data
    colors = sm.to_rgba(spectrogram_db.flatten())  # Colors for each magnitude value
    magnitudes = spectrogram_db.flatten()  # Flatten spectrogram_db for one-dimensional data

    # Convert colors to hex strings
    color_hex = [f"#{int(c[0]*255):02x}{int(c[1]*255):02x}{int(c[2]*255):02x}" for c in colors]

    # Sample magnitudes (limited to 20-30 entries)
    num_samples = min(len(magnitudes), 30)  # Ensure at most 30 samples
    sample_indices = np.linspace(0, len(magnitudes) - 1, num_samples, dtype=int)  # Sample indices
    sampled_magnitudes = magnitudes[sample_indices]
    sampled_colors = [color_hex[i] for i in sample_indices]

    # Create the data dictionary
    data = {
        magnitude: color for magnitude, color in zip(sampled_magnitudes, sampled_colors)
    }

    # Return base64 string and cleanup
    buffer.close()
    return {"encoded_image": encoded_image, "scale": data}


# ########## STARTTING APPLICATION

eel.init("web")
eel.start('index.html', port=1234, host='localhost')
