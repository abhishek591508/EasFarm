import React, { useState, useEffect } from 'react'
import './OTPVerification.css'

const OTPVerification = ({ email, onOTPVerified, onBack, isLogin = false }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false)

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return // Prevent multiple characters
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter complete 6-digit OTP')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString,
          type: isLogin ? 'login' : 'signup'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onOTPVerified(data.user)
      } else {
        setError(data.message || 'Invalid OTP. Please try again.')
      }
    } catch (error) {
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:5000/api/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: isLogin ? 'login' : 'signup'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTimeLeft(300) // Reset timer
        setCanResend(false)
        setOtp(['', '', '', '', '', '']) // Clear OTP inputs
        alert('New OTP sent to your email!')
      } else {
        setError(data.message || 'Failed to resend OTP')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>Verify Your Email</h2>
        <p className="otp-message">
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                maxLength="1"
                pattern="[0-9]"
                inputMode="numeric"
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="otp-timer">
            {timeLeft > 0 ? (
              <span>Code expires in: {formatTime(timeLeft)}</span>
            ) : (
              <span className="expired">OTP has expired</span>
            )}
          </div>

          <button 
            type="submit" 
            className="verify-button"
            disabled={isLoading || timeLeft === 0}
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>

        <div className="otp-actions">
          {canResend && (
            <button 
              type="button" 
              onClick={handleResendOTP}
              className="resend-button"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          )}
          
          <button 
            type="button" 
            onClick={onBack}
            className="back-button"
          >
            Back to {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification


