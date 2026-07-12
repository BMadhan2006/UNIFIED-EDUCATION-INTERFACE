import { useEffect, useState } from "react";
import api from "../services/api";

function MyLibrary() {
  const [books, setBooks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await api.get("/library", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#1b1d24",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        📚 My Library
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>{book.issueDate}</td>
                <td>{book.dueDate}</td>
                <td>{book.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Books Issued</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyLibrary;