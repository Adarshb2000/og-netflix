from os import system, walk

def convert(fileName: str, path: str = '.'):
    if not fileName.endswith('.mkv'):
        return
    
    fileName = fileName.rstrip('.mkv')

    print(f"ffmpeg -i '{path + '/' + fileName}.mkv' -codec copy '{path + '/' + fileName}.mp4'")
    system(f"ffmpeg -i '{path + '/' + fileName}.mkv' -codec copy '{path + '/' + fileName}.mp4'")

def convertVideos(root):
    for directory, _, files in walk(root):
        for file in files:
            convert(file, directory)

convertVideos('/home/darsh/1TBcloud/Attack on Titan/Attack on Titan S2')