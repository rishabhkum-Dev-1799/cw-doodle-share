import { useState } from 'react';

import { ButtonLabels, Headings, placeholder } from '../../../locale/en';
import Input from '../../UI/Input/Input';
import Heading from '../../UI/Typography/Heading';
import Container from '../../UI/Wrapper/Container';
import DefaultButton from '../../UI/Buttons/DefaultButton';

type FormObj = {
  userName: string;
  roomCode: string;
};
const JoinRoomForm = () => {
  const [form, setForm] = useState<FormObj | null>({
    userName: '',
    roomCode: '',
  });
  const onChangeHandler = () => {};
  return (
    <Container>
      <section className='max-container w-full flex flex-col gap-8 items-center p-4'>
        <Heading
          label={Headings.join_room}
          headingLevel='h1'
          className='text-secondary text-2xl md:text-4xl  font-bold'
        />
        <form className='w-[80%]  md:w-[50%] overflow-hidden p-4 flex flex-col items-center gap-4 '>
          <Input
            // value={form?.userName}
            name='userName'
            placeholder={placeholder.enter_name}
            onChange={onChangeHandler}
            className='w-full'
          />
          <Input
            // value={form?.roomCode}
            name='userName'
            placeholder={placeholder.enter_room_code}
            onChange={onChangeHandler}
            className='w-full'
          />
          <DefaultButton className=' w-full sm:w-[200px] hover:scale-105'>
            {ButtonLabels.go}
          </DefaultButton>
        </form>
      </section>
    </Container>
  );
};

export default JoinRoomForm;
