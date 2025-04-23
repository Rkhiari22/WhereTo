const LoadingBar = ({ isLoading }) => {
    return (
      <div className={`loading-bar ${isLoading ? 'active' : ''}`}>
        <div className="loading-progress"></div>
      </div>
    );
  };
  
  export default LoadingBar;