import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { ButtonLabels, Headings, placeholder } from '../../../locale/en';
import Input from '../../UI/Input/Input';
import Heading from '../../UI/Typography/Heading';
import Container from '../../UI/Wrapper/Container';
import DefaultButton from '../../UI/Buttons/DefaultButton';

interface FormObj {
  userName: string;
  roomId: string;
}
const JoinRoomForm = () => {
  const [form, setForm] = useState<FormObj>({
    userName: '',
    roomId: '',
  });
  const navigate =useNavigate();
  // function handlers
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const joinedRoomData = {
      name: form?.userName,
      roomId: form?.roomId,
      userId: uuidv4(),
      host: false,
      presenter: false,
    };
    console.log(joinedRoomData)
    navigate(`/room/${form.roomId}`)
  };
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Container>
      <section className='max-container w-full flex flex-col gap-8 items-center p-4'>
        <Heading
          label={Headings.join_room}
          headingLevel='h1'
          className='text-secondary text-2xl md:text-4xl  font-bold'
        />
        <form
          className='w-[80%]  md:w-[50%] overflow-hidden p-4 flex flex-col items-center gap-4'
          onSubmit={submitFormHandler}
        >
          <Input
            value={form?.userName}
            name='userName'
            placeholder={placeholder.enter_name}
            onChange={onInputHandler}
            className='w-full'
          />
          <Input
            value={form?.roomId}
            name='roomId'
            placeholder={placeholder.enter_room_code}
            onChange={onInputHandler}
            className='w-full'
          />
          <DefaultButton
            className=' w-full sm:w-[200px] hover:scale-105'
            type='submit'
          >
            {ButtonLabels.go}
          </DefaultButton>
        </form>
      </section>
    </Container>
  );
};

export default JoinRoomForm;
