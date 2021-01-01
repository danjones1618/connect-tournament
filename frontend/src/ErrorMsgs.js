import Swal from 'sweetalert2';

export const InvalidTournament = () => Swal.fire({
  title: 'Invalid Tournament',
  icon: 'error',
  text: 'Check you got it right and try again',
});

export const InvalidName = () => Swal.fire({
  title: 'Name is already taken',
  icon: 'error',
  text: 'Choose a different name',
});

export const InvalidTurn = () => Swal.fire({
  title: 'Invalid Turn',
  icon: 'error',
  text: 'Please choose a valid move',
});

export const Won = () => Swal.fire({
  title: 'You won!',
  icon: 'success',
  text: 'Well done',
});

export const Lost = () => Swal.fire({
  title: 'You lost :-(',
  icon: 'warning',
  text: 'Better luck next time',
});

export const UnexpectedError = () => Swal.fire({
  title: 'An unexpected error occurred...',
  icon: 'warning',
  text: 'Please try again in a minuite',
});
