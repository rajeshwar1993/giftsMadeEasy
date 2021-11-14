import Footer from './footer';
import NavBar from './navbar';

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
