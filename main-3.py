import numpy as np
import matplotlib.pyplot as plt
from scipy.fft import fft, ifft
from ambient_noise import generate_ambient_noise
from avs_data import avs_data
from doa_est import doa_est
from theta2_avs import theta2_avs
from tx_sig import transmit_sig
from pos_true_theta import pos
from grid_cord_est import grid_cord_new
import json

# Open and read the JSON file
with open('./db/inputs.json', 'r') as file:
    data = json.load(file)

# ############### INPUTS PAGE
# Parameters
TS = data["targetStrength"]  # Target Strength dB re 1uPa
fs = data["samplingRate"]  # Sampling frequency in Hz
seastate = data["seastate"]  # Sea state
duration = data["signalDuration"]  # Duration of Signal in seconds
f = data["noiseSourceFrequency"]  # Frequency of Noise Source in Hz

# Sensor positions (Example values)
SX1, SY1 = data["avs1X"], data["avs1Y"]
SX2, SY2 = data["avs2X"], data["avs2Y"]
SX3, SY3 = SX2, SY2

# Target position (Example values)
TPX1, TPY1 = data["targetX"], data["targetY"]
SP = np.array([[SX1, SY1], [SX2, SY2], [SX3, SY3]])  # AVS Positions
TP = np.array([TPX1, TPY1])  # Target Position

print(TPX1)

# ############### AVS CALCULATION PAGE
# Generate transmitted signal
Tx, t = transmit_sig(duration, fs, f, TS)

# Generate ambient noise
noise1 = generate_ambient_noise(seastate, fs, len(t))
noise2 = generate_ambient_noise(seastate, fs, len(t))
noise3 = generate_ambient_noise(seastate, fs, len(t))

# Calculate distances and angles
D, true_theta = pos(SP, TP)
r1, r2, r3 = D
theta1, theta2, theta3 = true_theta

# Generate AVS data
# Common data for all waveforms and spectrograms --> Tx = y axis array, p1, vx1, vy1, t =  x axis array
# (x axis data, y axis data) --> (t, Tx), (t, p1), (t, vx1), (t, vy1) respectively to all waveforms and spectrogram
# Similarly with AVS 2
p1, vx1, vy1, SNR1, RNL1 = avs_data(TS, Tx, r1, theta1, noise1)
p2, vx2, vy2, SNR2, RNL2 = avs_data(TS, Tx, r2, theta2, noise2)
p3, vx3, vy3, _, _ = avs_data(TS, Tx, r3, theta3, noise3)

# Estimate DOA
doa_est_1 = doa_est(p1, vx1, vy1)
doa_est_2 = doa_est(p2, vx2, vy2)
doa_est_3 = doa_est(p3, vx3, vy3)
theta_estimate = np.array([doa_est_1, doa_est_2, doa_est_3])

doa_error1 = abs(theta1 - doa_est_1)
doa_error2 = abs(theta2 - doa_est_2)

# Update fields (simulated here as print statements)
print(f"SNR1: {SNR1}")
print(f"SNR2: {SNR2}")
print(f"RNL1: {RNL1}")
print(f"RNL2: {RNL2}")
print(f"theta_est_1: {doa_est_1}")
print(f"theta_est_2: {doa_est_2}")
print(f"theta1: {theta1}")
print(f"theta2: {theta2}")
print(f"r1: {r1}")
print(f"r2: {r2}")
# DoA Error -->
print(f"theta1 - theta_est_1: {doa_error1}")
print(f"theta2 - theta_est_2: {doa_error2}")


# Example initialization of the application parameters
N = 3

# Calculate the estimated position
T_est = grid_cord_new(N, SP, theta_estimate)

# Update values (simulated here as print statements)
TPX1, TPY1 = TP
T_est_x, T_est_y = T_est
range_error = np.sqrt((TPX1 - T_est_x)**2 + (TPY1 - T_est_y)**2)

print(f"True Position X: {TPX1}")
print(f"True Position Y: {TPY1}")
print(f"Estimated Position X: {T_est_x}")
print(f"Estimated Position Y: {T_est_y}")
print(f"Grid Estimation Error: {range_error}")
