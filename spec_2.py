import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt
import io
import base64
import json

def saveSpectrogramImage(signal, samplingRate):
    """
    Generates a base64-encoded spectrogram image using librosa.

    Args:
        signal (np.array): Audio signal array.
        samplingRate (int): Sampling rate of the audio signal.

    Returns:
        str: Base64-encoded string of the spectrogram image.
    """

    # Compute the Short-Time Fourier Transform (STFT)
    D = librosa.stft(signal, n_fft=2048, hop_length=512, win_length=2048)
    DP =np.abs(D) ** 2

    # Convert the amplitude to dB-scaled spectrogram
    S_db = librosa.power_to_db(DP)

    # Create a buffer to save image
    buffer = io.BytesIO()

    # Plotting
    plt.figure(figsize=(10, 6))
    librosa.display.specshow(S_db, sr=samplingRate, hop_length=512, x_axis='time', y_axis='linear')
    plt.colorbar(format='%+2.0f dB')
    plt.axis('off')  # No axes for a cleaner image
    plt.savefig(buffer, format='png', bbox_inches='tight', pad_inches=0)
    plt.close()
    buffer.seek(0)

    # Encode the byte array as base64 string
    encoded_image = base64.b64encode(buffer.read()).decode('utf-8')

    # Cleanup and return the base64 string
    buffer.close()
    return encoded_image

# Example usage
with open('./db/calculations.json', 'r') as json_file:
    data = json.load(json_file)

signal = np.array(data['vx1'])
fs = data['samplingRate']

# Get the base64 string of the spectrogram image
encoded_spectrogram = saveSpectrogramImage(signal, fs)
print(encoded_spectrogram)
