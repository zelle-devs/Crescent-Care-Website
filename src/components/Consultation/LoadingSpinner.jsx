"use client";
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-dot"></div>
                <div className="spinner-text">Loading…</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;