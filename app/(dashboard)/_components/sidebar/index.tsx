import { List } from "./list"
import { NewButton } from "./new-button"

const Sidebar=()=>{
    return(
        <aside className="fixed z-[1] left-0 bg-blue-700 h-full w-[60px] text-white flex p-3 gap-y-4 flex-col items-center">
            <List/>
            <NewButton/>
        </aside>
    )

}

export default Sidebar