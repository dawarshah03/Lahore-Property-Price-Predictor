# Lahore Property Price Predictor
## Problem
In Lahore, property prices are not always clear. Most people rely on rough guesses instead of data. This can cause wrong decisions and financial loss for both buyers and sellers.

## Solution
This project is a Machine Learning Property Price Predictor. It uses property details like area, location, bedrooms, and bathrooms to predict the price.

## What Are We Finding
We are predicting the property price in Lahore based on its features.

## Columns Used
The dataset contains:

- Area (in Marla)
- Location
- Price
- Bedrooms
- Bathrooms

## Data Cleaning and Preprocessing
To make the dataset useful, we cleaned and prepared it:

- Corrected wrong or repeated values.
- Converted location (categorical data) into numbers using One-Hot Encoding.
- Removed outliers (very high or very low unusual values) using Standard Deviation method.
- Separated data into training set and testing set to check accuracy.

## Machine Learning Model
We trained the dataset on different ML algorithms and compared results.

Tested multiple models using Scikit-learn.

Finally, **Linear Regression** gave the best and most accurate results.

Libraries used: **Scikit-learn, Pandas, NumPy, Matplotlib.**

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Flask (Python)
- ML: Scikit-learn, Pandas, NumPy, Matplotlib

## How It Works
User enters property details (area, location, bedrooms, bathrooms).

The details go to the Flask backend.

The ML model processes the data and predicts the property price.

The web app shows the predicted price to the user.

## Screenshots

<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/22ddc057-cb93-4bc0-ab75-b6d0a133ea19" />
<img width="1919" height="774" alt="image" src="https://github.com/user-attachments/assets/95cea2a2-ee25-459f-9546-55da45c73c66" />
<img width="1919" height="361" alt="image" src="https://github.com/user-attachments/assets/e77a16a6-9c3a-42af-8742-36c4bdeca357" />
