// import { useEffect, useState } from 'react';
// import Table from 'react-bootstrap/Table';

// function UserComponent() {
//     const [users, setUsers] = useState([])
//     useEffect(() => {
//         try {
//             axios.get("http://localhost:3001/admin/")
//                 .then(response => setMovies(response.data))
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }, [movies])
//     return (
//         <Table striped>
//             <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>First Name</th>
//                     <th>Last Name</th>
//                     <th>Username</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>1</td>
//                     <td>Mark</td>
//                     <td>Otto</td>
//                     <td>@mdo</td>
//                 </tr>
//                 <tr>
//                     <td>2</td>
//                     <td>Jacob</td>
//                     <td>Thornton</td>
//                     <td>@fat</td>
//                 </tr>
//                 <tr>
//                     <td>3</td>
//                     <td colSpan={2}>Larry the Bird</td>
//                     <td>@twitter</td>
//                 </tr>
//             </tbody>
//         </Table>
//     );
// }

// export default StripedRowExample;