import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import data from '../constants/Form.json';
import { DynamicInput } from '../components/DynamicForm';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  title: '',
  description: ''
};
const EditTodo = () => {
  // Inits
  const { todoFields } = data;
  const [todoFormData, settodoFormData] =
    useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // calls when user do some change in input field
  const handleUserDataChange = (event) => {
    const { name, value } = event.target;
    settodoFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    const errObj = { ...errors };
    delete errObj[name];
    setErrors(errObj);
  };

  // For validate the form
  const validateForm = () => {
    let isValid = true;
    for (const [key, value] of Object.entries(todoFormData)) {
      // For todo title
      if (key === 'title') {
        if (value.length < 3) {
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid title',
            };
          });
        }
      }
      // For description
      if (key === 'description') {
        if (value.length < 6) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid description',
            };
          });
        }
      }
    }
    return isValid;
  };

  //Handling the form submission
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const response = await fetch('http://localhost:5000/user/register', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoFormData),
        });
        if (response.status === 200) {
          toast.success('Todo Edited  successfully');
          navigate('/');
        } else {
          toast.error('Please enter valid Todo Details');
        }
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Edit Todo
        </h1>
        <form className="mt-6" onSubmit={formSubmitHandler}>
          {todoFields.map((singleFieldData, index) => {
            return (
              <DynamicInput
                key={index}
                singleFieldData={singleFieldData}
                handleUserDataChange={handleUserDataChange}
                errors={errors}
              />
            );
          })}
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
