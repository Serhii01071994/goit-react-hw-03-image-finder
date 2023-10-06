export const LoadMoreButton = ({ onLoadMore, isLastItems }) => {
  return (
    <button
      className="button"
      type="button"
      onClick={onLoadMore}
      disabled={isLastItems}
    >
      Load More
    </button>
  );
};
