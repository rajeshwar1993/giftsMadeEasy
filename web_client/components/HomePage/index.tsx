import HomeEvents from './homeEvents';
import HomeInfo from './homeInfo';
import PageBanner from './pageBanner';

const HomePage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-'>
      {/* Banner Section */}
      <PageBanner />
      <HomeInfo />
      <HomeEvents />
    </div>
  );
};

export default HomePage;
