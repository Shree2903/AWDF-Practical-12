function ErrorMessage({message, onRetry}){
    return(
        <div>
            <p>Something went wrong: {message}</p>
            {onRetry && <button onClick={onRetry}>Retry</button>}
        </div>
    );
}

export default ErrorMessage;