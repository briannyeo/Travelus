export default function ItineraryCard(props) {
  const {posts} = props;
  console.log("posts",posts)
  return (
    <>
    {(posts) ?
      (<div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div className="absolute inset-0">
      <div className="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div className="relative max-w-7xl mx-auto">
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post) => (
          <div key={post.itinerary_title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src={post.image} alt="destination" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <div className="hover:underline">
                    {post.destination}
                  </div>
                </p>
                <div className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">{post.itinerary_title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.itinerary_body}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div>
                    <span className="sr-only">{post.authorId}</span>         
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {/* <a href={post.author.href} className="hover:underline">
                      {post.author.name}
                    </a> */}
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.created_at}>{post.created_at}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>) : (<div></div>)}
  </>
    
  )
}
