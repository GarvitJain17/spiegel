"use client"

import { useQuery } from "convex/react";
import { EmptyBoard } from "./empty-board";
import { EmptyFavourites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./newBoardButton";


interface BoardListProps{
    orgId:string;
    query:{
        search?:string;
        favorites?:string;
    }
}
export const BoardList= ({
    orgId,
    query
}:BoardListProps) =>{

    const data=useQuery(api.boards.get,{orgId,
...query,});
console.log(data);
    if(data === undefined) {
        return (
            <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favourite Boards" : "Team Boards"}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cold-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId} disabled/>
                <BoardCard.Skeleton/>
                <BoardCard.Skeleton/>
                <BoardCard.Skeleton/>
                <BoardCard.Skeleton/>
            </div>
         </div>
        )
    }
    if(!data?.length && query.search){
        return (
            <div>
                <EmptySearch/>
            </div>
        )
           
    }

    if(!data?.length && query.favorites){
        return (
            <div>
                <EmptyFavourites/>
            </div>
        )     
    }

    if(!data?.length){ 
        return (
            <div>
                <EmptyBoard/>
            </div>
        )
    }
    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favourite Boards" : "Team Boards"}
            </h2>
            <div className="grid  sm:grid-cols-2 md:grid-cold-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid grid-cols-6 gap-5 mt-8 pb-10">
                <NewBoardButton orgId={orgId}/>
                {data?.map((board) => (
                    <BoardCard
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    authorId={board.authorId}
                    authorName={board.authorName}
                    createdAt={board._creationTime}
                    imageUrl={board.imageUrl}
                    orgId={board.orgId}
                    isFavorite={board.isFavorite}
                   />
                ))}
                {/* {JSON.stringify(data)}; */}
            </div>
        </div>
    )
};


























