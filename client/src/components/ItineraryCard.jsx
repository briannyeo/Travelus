const ItineraryCard = (props) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
 
      <div className="card-body">
        <h2 className="card-title">{props.destination}</h2>
        <p>{props.author}</p>
       
      </div>
    </div>
  );
};

export default ItineraryCard;
