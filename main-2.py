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

# Parameters
TS = 140  # Target Strength dB re 1uPa
fs = 51200  # Sampling frequency in Hz
seastate = 1  # Sea state
duration = 2  # Duration of Signal in seconds
f = 1000  # Frequency of Noise Source in Hz

# Sensor positions (Example values)
SX1, SY1 = 0, 200
SX2, SY2 = 0, 0
SX3, SY3 = SX2, SY2

# Target position (Example values)
TPX1, TPY1 = 500, 600
SP = np.array([[SX1, SY1], [SX2, SY2], [SX3, SY3]])  # AVS Positions
TP = np.array([TPX1, TPY1])  # Target Position

# Generate transmitted signal
Tx, t = transmit_sig(duration, fs, f, TS)

# Generate ambient noise
noise1 = generate_ambient_noise(seastate, fs, len(t))
noise2 = generate_ambient_noise(seastate, fs, len(t))
noise3 = generate_ambient_noise(seastate, fs, len(t))

# Define plot parameters
LX = [SX1, SX2, SX3, TPX1]
LY = [SY1, SY2, SY3, TPY1]
SU = 200
LLX = min(LX) - SU
HLX = max(LX) + SU
LLY = min(LY) - SU
HLY = max(LY) + SU
markerSize = 100

# Plotting sensor and target positions
plt.figure()
plt.scatter(SX1, SY1, s=markerSize, marker='p', color='blue', edgecolor='black', label='AVS-1')
plt.scatter(SX2, SY2, s=markerSize, marker='p', color='blue', edgecolor='black', label='AVS-2')
plt.scatter(TPX1, TPY1, s=130, marker='d', color='black', edgecolor='red', label='Target position')
plt.xlim(LLX, HLX)
plt.ylim(LLY, HLY)
plt.legend(fontsize='medium', loc='best')
plt.title('AVS and Target Position', fontsize=20, color='magenta')
plt.xlabel('X Position')
plt.ylabel('Y Position')
plt.grid(True)
plt.show()

# Calculate distances and angles
D, true_theta = pos(SP, TP)
r1, r2, r3 = D
theta1, theta2, theta3 = true_theta

# Generate AVS data
p1, vx1, vy1, SNR1, RNL1 = avs_data(TS, Tx, r1, theta1, noise1)
p2, vx2, vy2, SNR2, RNL2 = avs_data(TS, Tx, r2, theta2, noise2)
p3, vx3, vy3, _, _ = avs_data(TS, Tx, r3, theta3, noise3)

# Estimate DOA
theta_est_1 = doa_est(p1, vx1, vy1)
theta_est_2 = doa_est(p2, vx2, vy2)
theta_est_3 = doa_est(p3, vx3, vy3)
theta_estimate = np.array([theta_est_1, theta_est_2, theta_est_3])

# Update fields (simulated here as print statements)
print(f"SNR1: {SNR1}")
print(f"SNR2: {SNR2}")
print(f"RNL1: {RNL1}")
print(f"RNL2: {RNL2}")
print(f"theta_est_1: {theta_est_1}")
print(f"theta_est_2: {theta_est_2}")
print(f"theta1: {theta1}")
print(f"theta2: {theta2}")
print(f"r1: {r1}")
print(f"r2: {r2}")
# DoA Error -->
print(f"theta1 - theta_est_1: {abs(theta1 - theta_est_1)}")
print(f"theta2 - theta_est_2: {abs(theta2 - theta_est_2)}")

# Example initialization of the application parameters
N = 3

# Calculate the estimated position
T_est = grid_cord_new(N, SP, theta_estimate)

# Update values (simulated here as print statements)
TPX1, TPY1 = TP
T_est_x, T_est_y = T_est
rse_grid = np.sqrt((TPX1 - T_est_x)**2 + (TPY1 - T_est_y)**2)

print(f"True Position X: {TPX1}")
print(f"True Position Y: {TPY1}")
print(f"Estimated Position X: {T_est_x}")
print(f"Estimated Position Y: {T_est_y}")
print(f"Grid Estimation Error: {rse_grid}")

# Plot sensor and target positions
LX = [T_est_x, SP[0, 0], SP[1, 0], SP[2, 0], TPX1]
LY = [T_est_y, SP[0, 1], SP[1, 1], SP[2, 1], TPY1]
SU = 200
LLX = min(LX) - SU
HLX = max(LX) + SU
LLY = min(LY) - SU
HLY = max(LY) + SU

plt.figure()
plt.scatter(SP[0, 0], SP[0, 1], s=200, marker='p', color='blue', edgecolor='black', label='AVS-1')
plt.scatter(SP[1, 0], SP[1, 1], s=200, marker='p', color='blue', edgecolor='black', label='AVS-2')
plt.scatter(T_est_x, T_est_y, s=130, marker='s', color='green', edgecolor='red', label='Estimated Position')
plt.scatter(TPX1, TPY1, s=130, marker='d', color='black', edgecolor='red', label='Actual Position')
plt.xlim(LLX, HLX)
plt.ylim(LLY, HLY)
plt.legend(fontsize='medium', loc='upper left')
plt.title('AVS and Target Position', fontsize=20, color='magenta')
plt.xlabel('X Position')
plt.ylabel('Y Position')
plt.grid(True)
plt.show()
