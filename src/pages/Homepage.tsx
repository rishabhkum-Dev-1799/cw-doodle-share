import { useNavigate } from 'react-router-dom';

import DefaultButton from '../components/UI/Buttons/DefaultButton';
import { ButtonLabels } from '../locale/en';
import Container from '../components/UI/Wrapper/Container';
const Homepage = () => {
  const navigate = useNavigate();
  const navigateToJoinRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/join-room');
  };
  const navigateToCreateRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/create-room');
  };
  return (
    <Container>
      <section className=' full flex flex-col items-center gap-4 p-4 w-full  '>
        <DefaultButton
          className='w-[100px] md:w-[200px]'
          onClick={navigateToCreateRoom}
        >
          {ButtonLabels?.create_room}
        </DefaultButton>
        <DefaultButton
          className='w-[100px] md:w-[200px]'
          onClick={navigateToJoinRoom}
        >
          {ButtonLabels?.join_room}
        </DefaultButton>
      </section>
    </Container>
  );
};

export default Homepage;
