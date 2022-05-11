"""
High-tier computer science sh*tposting.

Through text-to-speech, says a plethora of flavorful profanity and colorful \
    language, given the user says the word "Poolesville."
To the Magnet admission office, this one is for you. It barely works, just \
    like you. <3
"""

from random import choice
import speech_recognition as sr
import pyttsx3

recognition = sr.Recognizer()
microphone = sr.Microphone(
    sr.Microphone.list_microphone_names().index("pulse"))
speaker = pyttsx3.init()
speaker.setProperty("volume", 1)
speaker.setProperty("voice", speaker.getProperty("voices")[2].id)

FLAVOR = ["you", "me", "this", "off", "it", "everything", "everyone", "no",
          "fuck fuck fuck", "god"]

while True:
    try:
        with microphone as stream:
            recognition.adjust_for_ambient_noise(stream)
            resolved = recognition.recognize_sphinx(recognition.listen(stream))
            # CMUSphinx is really bad.
            if resolved.split(" ")[0][1:] in ["ool", "ools", "ool's"] or \
                    resolved.split(" ")[0] in ["hold", "pulls"]:
                print("I'M DONE WITH THIS SHIT.")
                speaker.say("Fuck " + choice(FLAVOR))
                speaker.runAndWait()
                speaker.stop()
            else:
                print(resolved)
    except KeyboardInterrupt:
        print("I'M FINALLY FREE-")
        exit(0)
    except sr.UnknownValueError:
        pass
