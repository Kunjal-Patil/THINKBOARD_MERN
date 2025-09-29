
import { PenSquare } from "lucide-react";
import { Link } from "react-to-router-dom";

const NotesNotFound = () => {
  return (
    <div className='text-center'>
      <PenSquare className='mx-auto h-12 w-12 text-gray-400' />
      <h3 className='mt-2 text-sm font-semibold text-gray-900'>No notes</h3>
      <p className='mt-1 text-sm text-gray-500'>Get started by creating a new note.</p>
      <div className='mt-6'>
        <Link to={"/create"} className='btn btn-primary'>
          Create Note
        </Link>
      </div>
    </div>
  );
};
export default NotesNotFound;
