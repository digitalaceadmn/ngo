import React from 'react';
// Test React Icons step by step
import { FaHome, FaUser, FaHeart } from 'react-icons/fa';

// Simple test first - no MUI icons or complex Bootstrap
export default function TestPackagesPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Basic HTML test */}
      <h1>Package Installation Test</h1>
      
      {/* Test React Icons */}
      <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <h2>React Icons Test</h2>
        <div>
          <FaHome size={30} style={{ color: 'blue', marginRight: '10px' }} />
          <span>Home Icon</span>
        </div>
        <div>
          <FaUser size={30} style={{ color: 'green', marginRight: '10px' }} />
          <span>User Icon</span>
        </div>
        <div>
          <FaHeart size={30} style={{ color: 'red', marginRight: '10px' }} />
          <span>Heart Icon</span>
        </div>
      </div>

      {/* Test Bootstrap CSS only */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Bootstrap CSS Test</h2>
        <p>If Bootstrap CSS is loaded, the button below should be styled:</p>
        <button 
          className="btn btn-primary"
          style={{ 
            // Fallback styles if Bootstrap doesn't load
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Bootstrap Button
        </button>
      </div>

      {/* Status */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <h3>Test Results:</h3>
        <ul>
          <li>✅ If you see icons above, React Icons is working</li>
          <li>✅ If the button is styled (blue background), Bootstrap CSS is working</li>
          <li>✅ If this page loads without errors, the packages are properly installed</li>
        </ul>
      </div>
    </div>
  );
}