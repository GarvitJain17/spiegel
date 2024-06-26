import Image from "next/image"; 
export const EmptyFavourites =()=>{
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
            src="/no-favorites.png"
            alt="Empty Favorites"
            width={140}
            height={140}
            />
            <h2 className="text-2xl font-semibold mt-6">No Favorites Board</h2>
            <p className="text-muted-foreground testg-sm mt-2">Add Boards To favorites</p>
        </div>
    )
}
