const Home = (props) => {
  
  return (
    <>
      <div className="container">
        
        <h3>{props.name ? 'Hi'+ props.name : 'You are not logged in!'}</h3>
        
      </div>
    </>
  );
};

export default Home;
