import { useContext } from 'react';
import { PetitionContext, PetitionDispatchContext } from '../context/PetitionContext';

export const usePetitionDispatch = () => {
  return useContext(PetitionDispatchContext);
};

export const usePetition = () => {
  return useContext(PetitionContext);
};
