import React from 'react'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const EmojiPicker1 = ({
    addEmoji
}) => {
  return (
    <Picker
  data={data}
  emojiSize={20}
  emojiButtonSize={28}
  onEmojiSelect={addEmoji}
  maxFrequentRows={0}
/>
  )
}

export default EmojiPicker1
