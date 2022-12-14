# 익명 채팅 웹 어플리케이션 시장통 - Client
시장통은 익명 채팅 웹 어플리케이션입니다. <br> 
시작하기 버튼을 누르면 무작위로 조합된 이름과 테마색을 부여 받습니다. <br>
채팅 내용을 입력하면 현재 접속해있는 모두에게 메세지를 전달합니다. 본인이 전송한 채팅은 오른 쪽에, 타인이 전송한 내용은 왼쪽에 표시됩니다. <br>


<!---![My First Board](https://user-images.githubusercontent.com/71186266/188512988-3083ed89-2f7d-4f01-94b1-4bad8fd14780.jpg)--->
<img src="https://user-images.githubusercontent.com/71186266/188512988-3083ed89-2f7d-4f01-94b1-4bad8fd14780.jpg"> 
<img src="https://user-images.githubusercontent.com/71186266/188351720-62bc1226-6fdb-4dfb-b1bc-cb18eb22fea8.png" width=90%> 
<img src="https://user-images.githubusercontent.com/71186266/188351715-0c549b79-097b-4370-8744-0a1748918abf.png" width=90%>

1. **Client**: React를 기반으로 구현했습니다. SockJS를 통해 서버의 채널을 구독하여 메세지를 주고 받습니다. 현재는 하나의 구독 채널이 있으므로, 채팅방이 단 한개만 운영됩니다.
2. **Server**: Spring WebSocket + STOMP로 구현했습니다. 클라이언트의 요청이 오면, 해당 클라이언트에게 특정 채널을 구독하도록 합니다. 메세지 전달 요청이 들어올 경우, 요청자가 요청한 채널을 구독하고 있는 모두에게 메세지를 전달해줍니다. -> **[[시장통 서버 프로젝트 바로가기]](https://github.com/binary-ho/sijangtong-server)**
3. **Deploy**: AWS EC2 하나의 인스턴스에 클라이언트는 pm2로, 서버는 nohup으로 배포하였습니다. 
4. **CI/CD**: Travis CI + AWS S3 + AWS Deploy를 이용해 빌드와 배포를 자동화하였습니다. 하나의 인스턴스만을 사용하길 희망하여 젠킨스가 아닌 Travis CI를 이용하였습니다. 현재 서버 프로젝트에 적용 되어 있습니다. Travis CI를 통해, 서버 프로젝트 main 브랜치에 푸시가 감지될 때, 새로 빌드를 진행하여 AWS S3에 빌드 결과 파일을 보관합니다. 이후, AWS Deploy에 배포 요청을 보냅니다. 빌드 요청을 받게 된 AWS Deploy는 S3에서 빌드 파일을 가져온 다음, 프로젝트를 빌드합니다. 

<br>

현재는 배포와 CI/CD 적용에 중점을 두어 완성했으므로 아래와 같은 기능들을 추가해 나갈 예정입니다. 최종적으로는 이 프로젝트를 하나의 기능으로 가지는 큰 서비스를 만들어 보고 싶습니다.
- 채팅방 개설과 접속: 자유롭게 채팅방을 개설할 수 있습니다. 클라이언트에서 원하는 이름으로 구독 채널을 만들어 줄 수 있도록 해주면 구현 가능할 것으로 보입니다. 
- 채팅방 인원 제한: 처음 클라이언트에서 구독 요청을 할 때, 인원수를 카운팅하게 해준 다음 제한하면 될 것 같습니다.
- 이름과 테마 색상 중복 방지: 사용자들의 이름과 색상 정보를 가지고 있다가 체크해주면 될 것 같습니다. 인원 제한 기능과 함께 구현할 계획입니다.
