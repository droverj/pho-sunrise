const ReviewInteractionMessage = ({ reviews, userId, deleteConfirmed, reviewSubmitted, setDeleteConfirmed, handleDeleteReview }) => {
  return (
    <div>
      {deleteConfirmed ? (
        reviews.map((review) => (
          review.user_id === userId && (
            <div key={review.id} className='delete-review-confirmation'>
              <h3>Are you sure you want to delete your Phở Sunrise review?</h3>
              <p>You rated Phở Sunrise {review.rating}/5 stars.</p>
              <p>"{review.comment}"</p>
              <div className='confirmation'>
                <p>Delete your review?</p>
                <p className='warning'>This action is final.</p>
              </div>
              <button onClick={() => setDeleteConfirmed(null)}>Return</button>
              <button className="danger-button" onClick={() => handleDeleteReview(review)}>Delete</button>
            </div>
          )
        ))
      ) : (
        <>
          <div className='submitted-review'>
            {reviewSubmitted ? 'Your Phở Sunrise review has been submitted successfully.' : null}
            <br /><span>Thank you</span>
            {!deleteConfirmed && (
              <div className='delete-review'>
                <p>Delete your review?</p>
                <button onClick={() => setDeleteConfirmed(true)}>Delete</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewInteractionMessage;