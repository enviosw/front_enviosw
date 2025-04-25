import React from 'react'

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="text-4xl text-blue-600 mb-6">
          <span role="img" aria-label="sad-face">😞</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-4">PAGE NOT FOUND</p>
        <p className="text-gray-500 mb-4">
          We looked everywhere for this page. Are you sure the website URL is correct?
        </p>
        <p className="text-gray-500 mb-4">
          Get in touch with the site owner.
        </p>
        <a href="/" className="btn btn-primary">Go Back Home</a>
      </div>
    </div>
  )
}

export default NotFound
