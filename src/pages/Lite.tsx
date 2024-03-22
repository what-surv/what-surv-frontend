import CommingSoon from './misc/CommingSoon';
import { Appbar } from '../stories/appbar/Appbar';
import Footer from '../stories/footer/Footer';
import { Tabbar } from '../stories/tabbar/Tabbar';

const Lite = () => {
  return (
    <div>
      <Appbar isAccount isLogo isFullLogo />
      <Tabbar isMobileVisible size='default' />
      <div className='max-w-[770px] w-full h-[calc(100vh_-_462px)] m-auto'>
        <CommingSoon />
      </div>
      <Footer />
    </div>
  );
};

export default Lite;
