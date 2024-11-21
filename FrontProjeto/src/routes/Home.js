import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Home.css';


function Home() {

    const [books, setBooks] = useState([])

    const getBooks = async () => {
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/book/'
            );

            const data = response.data;
            setBooks(data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        
       <div>
        <h1>Conheça nossos livros</h1>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');
</style>
        <div className="main_container">
            {books.length === 0 ? (<p>Carregando...</p>) : (
                books.map((book) => (
                    <div className='books_container'>
                        <div className="book" key={book.id}>
                            <img src={book.book_img} alt={book.book_name} />
                            <h2>{book.book_name}</h2>
                            <p>Gênero: {book.book_genre}</p>
                            <p>Autores: 
                                {book.authors.map(author => (
                                    <div key={author.id_author}>
                                        {author.author_name}
                                    </div>
                                ))}
                            </p>
                            <p>Disponibilidade: {book.available ? 'Disponível' : 'Indisponível'}</p>
                            <Link to={`/book/${book.id_book}`}>Detalhes</Link>
                        </div>
                    </div>
                ))
            )}
      </div> 
    </div>
        
  );
} 
export default Home;


