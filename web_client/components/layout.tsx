import Footer from './footer';
import NavBar from './Navbar';

const Layout = (props: any) => {
  return (
    <>
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
