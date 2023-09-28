import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { ButtonLabels, Headings, placeholder } from '../../../locale/en';
import DefaultButton from '../../UI/Buttons/DefaultButton';
import Input from '../../UI/Input/Input';
import Heading from '../../UI/Typography/Heading';
import Container from '../../UI/Wrapper/Container';

interface formObj {
  userName: string;
  generateRoomId: string;
}
const CreateRoomForm = () => {
  const [form, setForm] = useState<formObj>({
    userName: '',
    generateRoomId: '',
  });
  const navigate=useNavigate();
  // function handlers
  const userNameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevValue) => ({ ...prevValue, userName: event.target.value }));
  };
  const generateRandomuuid = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const generatedId = uuidv4();
    setForm((prevValue) => ({ ...prevValue, generateRoomId: generatedId }));
  };
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.generateRoomId && form.userName) {
      const createdRoomData = {
        name: form?.userName,
        roomId: form?.generateRoomId,
        userId: uuidv4(),
        host: true,
        presenter: true,
      };
      console.log(createdRoomData)
      navigate(`/room/${form.generateRoomId}`);
    }
  };
  return (
    <Container>
      <section className='max-container w-full flex flex-col gap-8 items-center p-4'>
        <Heading
          label={Headings.create_room}
          headingLevel='h1'
          className='text-secondary text-3xl md:text-4xl  font-bold'
        />
        <form
          className='w-[80%]  md:w-[50%] overflow-hidden p-4 flex flex-col items-center gap-4'
          onSubmit={submitFormHandler}
        >
          <Input
            value={form?.userName}
            placeholder={placeholder.enter_name}
            name='userName'
            onChange={userNameInputHandler}
            className='w-full'
            required
          />
          <div className='flex flex-col md:flex-row gap-2 w-full overflow-hidden'>
            <Input
              value={form?.generateRoomId}
              placeholder={placeholder.generate_room_code}
              name='generateRoomId'
              disabled
              className='w-full md:w-3/4'
            />
            <div className='flex  items-center justify-center gap-2 '>
              <DefaultButton
                className='hover:scale-100 p-4 my-2 text-sm bg-green-100 text-secondary font-semibold'
                onClick={generateRandomuuid}
              >
                {ButtonLabels.generate}
              </DefaultButton>
              <DefaultButton className='hover:scale-100 p-4 my-2 text-sm  bg-green-100 text-secondary font-semibold'>
                {ButtonLabels.copy}
              </DefaultButton>
            </div>
          </div>

          <DefaultButton
            className=' w-full md:w-[200px] hover:scale-105'
            type='submit'
          >
            {ButtonLabels.go}
          </DefaultButton>
        </form>
      </section>
    </Container>
  );
};

export default CreateRoomForm;
