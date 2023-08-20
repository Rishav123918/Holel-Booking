import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  // console.log("data are here",data);
  const images=[
    "https://rb.gy/w9hj7",
    "https://rb.gy/lrph4",
    "https://rb.gy/no0fq",
    "https://images7.alphacoders.com/877/877723.jpg",
    "http://1.bp.blogspot.com/-Iodj3FiiXPE/UAjl4lybHcI/AAAAAAAAA5g/BuJ9NuE-Mw8/s1600/Bellagio_caesar's_palace_2010.JPG",
  ];
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item,index) => (
            <div className="fpItem" key={item._id}>
              <img
                // src={item.images[0]}
                // alt=""
                // className="fpImg"
                src={item.images ? item.images[0] : images[index % images.length]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
