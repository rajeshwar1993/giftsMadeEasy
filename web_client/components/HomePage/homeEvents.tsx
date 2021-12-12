const HomeEvents = () => {
  return (
    <div className='w-full my-8 text-skin-primary'>
      <div className='flex items-end'>
        <span className='text-3xl'>Upcomming Events</span>
        <span className='text-lg mx-4'>View All</span>
      </div>
      {/* Events container */}
      <div className='flex lg:flex-row flex-col w-full'>
        <div className='m-4  max-w-sm'>
          <div className='h-48 w-full bg-green-200 rounded-lg flex justify-center items-center'>
            <span className='text-2xl'>Event 1</span>
          </div>
          <div className='text-sm py-4 text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </div>
        </div>
        <div className='m-4  max-w-sm'>
          <div className='h-48 w-full bg-green-200 rounded-lg flex justify-center items-center'>
            <span className='text-2xl'>Event 2</span>
          </div>
          <div className='text-sm py-4 text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </div>
        </div>
        <div className='m-4  max-w-sm'>
          <div className='h-48 w-full bg-green-200 rounded-lg flex justify-center items-center'>
            <span className='text-2xl'>Event 3</span>
          </div>
          <div className='text-sm py-4 text-center'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvents;
