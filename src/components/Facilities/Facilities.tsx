import './Facilities.css';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Facilities = () => {
  const navigate = useNavigate();

  const navigateToTag = (tag: string) => {
    navigate('/tour', {state: {tag: tag}});
  }

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollAmount = event.deltaY;
    const container = event.currentTarget;
    container.scrollLeft += scrollAmount;
  };

  return (
    <div className='main-container' ><h2 className="heading">Facilities</h2>
    <div className="facilities-container" onWheel={handleScroll}>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/registrar.jpg"}></img></div>
        <div className='facility-title'>Registrar</div>
        <div className="facility-content">
        Office of the Registrar, responsible for both administrative and academic services, plays a crucial role within the institution. Serving as the main keeper of student and alumni records, it administers operations related to enrollment, course requirements, earned credits, subject sequencing, promotion, graduation, transfers, suspension, and student dismissals. This office is located behind Study Hall.
        </div>
        <button className="navigate-button" onClick={() => navigateToTag('Q0tuzARZQHc')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/congre-area.jpg"}></img></div>
        <div className='facility-title'>Congregating Area</div>
        <div className="facility-content">
        The Congregating Area is a spacious multipurpose zone. Equipped with large ceiling fans, a versatile stage, and retractable seats, this area serves as the main facility for various school events, accommodating gatherings, performances, and sports activities such as basketball, volleyball, and badminton. Beyond its event hosting capabilities, students can utilize the space for studying or socializing with friends. It offers an environment that caters to both academic and recreational pursuits.
        </div>
        <button className="navigate-button" onClick={() => navigateToTag('8Xl9P925auo')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/canteen.jpg"}></img></div>
        <div className='facility-title'>Canteen</div>
        <div className="facility-content">
        The canteen, situated at Building 5, serves as a welcoming space for students, faculty, and staff to connect and socialize. With ample seating areas and vendors on both ends, it offers a broad range of options to accommodate the needs and preferences of the students and employees.
        </div>
        <button className="navigate-button" onClick={() => navigateToTag('aY82SzxE8pC')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/chapel.jpg"}></img></div>
        <div className='facility-title'>Chapel</div>
        <div className="facility-content">
        The Chapel stands as the primary venue for TIP's faith and spiritual activities, hosting prayers and Eucharistic celebrations to foster reflection and communion with God within the community. Recently renovated, the Chapel now offers an improved room, allowing students to access it at any time for convenient moments of spiritual connection and contemplation</div>
        <button className="navigate-button" onClick={() => navigateToTag('2gzpLDkQWA9')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/study-hall.jpg"}></img></div>
        <div className='facility-title'>Study Hall</div>
        <div className="facility-content">
        Study Hall is an open guarded space designed for students across programs to collaborate and work independently. With its spacious layout, large ceiling fans, numerous seats and tables, it provides an ideal environment for performing assignments, preparing for quizzes or exams, and working on projects. It is equipped with accessible electrical outlets and situated near WiFi access points, to cater to students with laptops and portable devices. It allows late-night study sessions as it remains open until 9:30 pm. It also contains a food stall in the corner.
        </div>
        <button className="navigate-button" onClick={() => navigateToTag('ep0OaUeLAWS')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/clinic.jpg"}></img></div>
        <div className='facility-title'>Medical and Dental Services</div>
        <div className="facility-content">
        The clinic is a facility to cater to the academic well-being of the students. It staffed during student hours with registered nurses, traveling health clerks, and physicians. It facilitates medical check-ups, signing of medical clearance, and consultation with physicians and dentists. It is also focused on managing emergencies and acute illnesses, as well as chronic health conditions. The clinic staff offers disease based education and resources to students and families when necessary.
        </div>
        <button className="navigate-button" onClick={() => navigateToTag('phGUbPnAmUy')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
        <div className="facility-card">
        <div className="facility-header"><img src={"../../../assets/lib8.jpg"}></img></div>
        <div className='facility-title'>Library - Building 8</div>
        <div className="facility-content">
        The library in TIP offers well-managed, diverse collections of library resources and knowledgeable and helpful staff. This small area is an alternative to the Main Library and is much nearer than it.</div>
        <button className="navigate-button" onClick={() => navigateToTag('QtUZqT9Xzxq')}>
            Navigate <ExitToAppIcon/>
        </button>
        </div>
    </div>
    </div>
  );
};

export default Facilities;