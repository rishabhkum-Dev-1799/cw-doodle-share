import { useState } from 'react';

import { ButtonLabels, Headings, placeholder } from '../../../locale/en';
import DefaultButton from '../../UI/Buttons/DefaultButton';
import Input from '../../UI/Input/Input';
import Heading from '../../UI/Typography/Heading';
import Container from '../../UI/Wrapper/Container';

type formObj = {
  userName: string;
  generateRoomCode: string;
};
const CreateRoomForm = () => {
  const [form, setForm] = useState<formObj | null>({
    userName: '',
    generateRoomCode: '',
  });
  const onChangeHandler = () => {};
  return (
    <Container>
      <section className='max-container w-full flex flex-col gap-8 items-center p-4'>
        <Heading
          label={Headings.create_room}
          headingLevel='h1'
          className='text-secondary text-3xl md:text-4xl  font-bold'
        />
        <form className='w-[80%]  md:w-[50%] overflow-hidden p-4 flex flex-col items-center gap-4 '>
          <Input
            // value={form?.userName}
            placeholder={placeholder.enter_name}
            name='userName'
            onChange={onChangeHandler}
            className='w-full'
          />
          <div className='flex flex-col md:flex-row gap-2 w-full overflow-hidden'>
            <Input
              // value={form?.roomCode}
              placeholder={placeholder.generate_room_code}
              name='userName'
              onChange={onChangeHandler}
              disabled
              className='w-full md:w-3/4'
            />
            <div className='flex  items-center justify-center gap-2 '>
              <DefaultButton className='hover:scale-100 p-4 my-2 text-sm bg-green-100 text-secondary font-semibold'>
                {ButtonLabels.generate}
              </DefaultButton>
              <DefaultButton className='hover:scale-100 p-4 my-2 text-sm  bg-green-100 text-secondary font-semibold'>
                {ButtonLabels.copy}
              </DefaultButton>
            </div>
          </div>

          <DefaultButton className=' w-full md:w-[200px] hover:scale-105'>
            {ButtonLabels.go}
          </DefaultButton>
        </form>
      </section>
    </Container>
  );
};

export default CreateRoomForm;
