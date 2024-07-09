import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { TodosList } from "../components";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);

  return (
    <div className="">
      <div>{data && <TodosList data={data} />}</div>
    </div>
  );
}

export default Home;
