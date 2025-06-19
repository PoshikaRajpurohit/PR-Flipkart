import '../App.css';
import kilos from '../assets/Images/kilos.png';
import mobile from '../assets/Images/mobile.png';
import fashion from '../assets/Images/fashion.png';
import electro from '../assets/Images/electro.png';
import home from '../assets/Images/home.jpg';
import applia from '../assets/Images/applia.jpg';
import flight from '../assets/Images/flight.png';
import kids from '../assets/Images/kids.png';
import wheeler from '../assets/Images/wheeler.png';
import { Container } from 'react-bootstrap';
const CategoryMenu = () => {
  const categories = [
   { name: "Kilos", image: kilos },
    { name: "Mobiles", image: mobile },
    { name: "Fashion", image: fashion },
    { name: "Electronics", image: electro },
    { name: "Home & Furniture", image: home },
    { name: "Appliances", image: applia },
    { name: "Flight Bookings", image: flight },
    { name: "Beauty, Toys & More", image: kids },
    { name: "Two Wheelers", image: wheeler },
  ];
  return (
    <Container fluid >
    <div className="category-menu shadow-sm px-4 my-4 mx-3 py-3 bg-white">   
         <div className="d-flex justify-content-between flex-wrap gap-3">
        {categories.map((cat, idx) => (
          <div className="text-center" key={idx} style={{ width: 80, cursor: 'pointer' }}>
            <img src={cat.image} alt={cat.name} className="img-fluid mb-1" style={{ height: 64 }} />
            <div className="fw-semibold" style={{ fontSize: '13px' }}>
              {cat.name}
            </div>
          </div>
        ))}
      </div>
     
    </div>
    </Container>
  );
};

export default CategoryMenu;
