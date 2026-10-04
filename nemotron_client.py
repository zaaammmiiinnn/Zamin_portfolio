import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()


def ask_nemotron(prompt: str, enable_thinking: bool = False) -> str:
    """Send a prompt to Nemotron and return the response text."""
    api_key = os.environ.get("NVIDIA_API_KEY")
    if not api_key:
        raise RuntimeError("NVIDIA_API_KEY is missing. Add it to your .env file.")

    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=api_key,
    )
    completion = client.chat.completions.create(
        model="nvidia/nemotron-3-ultra-550b-a55b",
        messages=[{"role": "user", "content": prompt}],
        temperature=1,
        top_p=0.95,
        max_tokens=4096,
        extra_body={"chat_template_kwargs": {"enable_thinking": enable_thinking}},
        stream=False,
    )
    return completion.choices[0].message.content


if __name__ == "__main__":
    print(ask_nemotron("Tell me a joke about programming."))
