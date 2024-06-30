import { fetchUsers } from "../(auth)/actions/fetchUsers";
import { client } from "../../sanity/lib/client";
import Quiz from "../components/Quiz";

export const dynamic = "force-dynamic";

async function getData() {
    const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer
  }`;

    const data = await client.fetch(query);
    return data;
}

const page = async () => {
    const questions = await getData();
    const user = await fetchUsers();
    const userId = user?.data.user.id;
    return (
        <>
            <Quiz questions={questions} userId={userId} />
        </>
    );
};

export default page;