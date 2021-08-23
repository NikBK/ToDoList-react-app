import React, { useState } from "react";
import { SideBar } from "./SideBar";
import { Task } from "./Task";

export const Content = () => {
    const [selectedTab, setSelectedTab] = useState("INBOX")
    return (
        <section className="content">
            <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <Task selectedTab={selectedTab} />
        </section>
    )
}