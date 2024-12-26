const form = document.getElementById( 'gifForm' );
const gifContainer = document.createElement( 'div' ); // Container for GIFs
document.body.appendChild( gifContainer );

const API_KEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'; // Provided GIPHY API key

form.addEventListener( 'submit', async function ( e )
{
    e.preventDefault(); // Prevent the form from refreshing the page

    const searchTerm = document.getElementById( 'searchInput' ).value.trim();

    if ( !searchTerm )
    {
        console.log( 'Search term is empty.' );
        return;
    }

    try
    {
        const response = await axios.get( 'http://api.giphy.com/v1/gifs/search', {
            params: {
                q: searchTerm,
                api_key: API_KEY,
                limit: 1, // Return one GIF
            },
        } );

        // Check if there are results
        if ( response.data.data.length > 0 )
        {
            const gifUrl = response.data.data[ 0 ].images.fixed_height.url; // Get the GIF URL

            // Create an <img> element and set the source to the GIF URL
            const img = document.createElement( 'img' );
            img.src = gifUrl;
            img.alt = searchTerm;
            img.style.margin = '10px';
            img.style.borderRadius = '5px';

            // Append the GIF to the gifContainer
            gifContainer.appendChild( img );
        } else
        {
            console.log( 'No GIFs found for this search term.' );
        }
    } catch ( error )
    {
        console.error( 'Error fetching data from GIPHY API:', error );
    }

    form.reset(); // Clear the input field
} );

// Remove all GIFs when the "Remove All GIFs" button is clicked
const removeAllBtn = document.getElementById( 'removeAll' );
removeAllBtn.addEventListener( 'click', function ()
{
    gifContainer.innerHTML = ''; // Clear all GIFs by resetting the innerHTML of gifContainer
} );
