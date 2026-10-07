// Run with: node check.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const expected = [
  {
    "file": "entrydsm.html",
    "lines": [
      "EntryDSM",
      "2026.06.02 ~ 진행 중",
      "팀 프로젝트 (5명, Backend 2, Frontend 3)",
      "대덕소프트웨어마이스터고등학교만의 온라인 원서 접수 시스템",
      "대덕소프트웨어마이스터고등학교는 10년이라는 기간동안 Entry의 시스템을 이용해 온라인으로 원서를 접수해왔습니다. 전국 각지에서 입학을 희망하는 지원자들이 먼 길 오지 않고 원서를 지원할 수 있게 도와줍니다.",
      "지원자 뿐만 아니라 선생님들의 업무도 함께 줄어들었습니다. 수기로 원서를 관리하는 방식에서, EntryDSM 서비스를 통해 웹에서 원서를 관리할 수 있습니다.",
      "기술 스택",
      "Kotlin Spring Boot Resilience4j MySQL Redis bazel Docker GitHub Actions AWS EC2/S3",
      "주요 기능",
      "온라인 입학 원서 접수: 지원자가 웹에서 입학 원서를 작성하고 접수할 수 있는 기능",
      "입학 원서 PDF 출력: 웹에서 작성한 원서를 PDF 문서로 변환",
      "원서 관리: 관리자가 접수된 입학 원서를 조회하고 관리하는 기능",
      "내가 맡은 역할",
      "아키텍처 분석 및 문서화",
      "이전 기수 선배가 구축한 Bazel 기반 MSA·헥사고날·멀티모듈 초기 구조 분석했습니다.",
      "인수인계 문서가 없는 상황에서 각 도메인의 역할을 정리하고, 개발에 참고할 문서 체계를 마련했습니다.",
      "서비스 간 통신 및 이벤트 처리 구현",
      "gRPC를 이용한 내부 서비스 통신과 Outbox·Redis Streams를 적용하여 이벤트를 처리했습니다.",
      "Spring Cloud Gateway와 Resilience4j로 게이트웨이 서비스를 구현하고, 서킷 브레이커를 적용했습니다.",
      "JWT 인증 및 쿠키 보안 정책 설계",
      "JWT를 HttpOnly 쿠키로 전달해 JavaScript의 토큰 접근을 제한했고, 토큰을 서버가 관리하게 했습니다.",
      "Secure 설정으로 HTTPS 전송을 강제하고, SameSite=Lax 설정과 CSRF 토큰 발급 정책으로 CSRF 대응을 고려했습니다.",
      "배포 및 서비스 관리 인수",
      "개발·배포 담당 팀원이 갑자기 부재하는 상황에서 해당 업무를 이어받아 배포와 담당 서비스 관리를 수행했습니다.",
      "문제 해결",
      "DB 커넥션 고갈 문제 해결 및 커넥션 풀 최적화",
      "운영 환경의 가용성을 높이기 위해 EC2 서버 2대와 ALB로 인프라를 구성했습니다. 하지만 DB를 사용하는 애플리케이션 6개에 HikariCP 설정을 별도로 적용하지 않아, 각 애플리케이션이 기본값인 최대 10개의 커넥션을 확보할 수 있었습니다.",
      "두 서버에서 모든 애플리케이션이 실행될 경우 이론적으로 최대 120개의 커넥션을 사용할 수 있었지만, RDS의 최대 커넥션 수는 고작 61개였습니다. 이로 인해 커넥션이 과도하게 점유되면서 데이터베이스 연결에 실패했습니다.",
      "우선 서비스 배포를 정상화하기 위해 한쪽 인스턴스의 애플리케이션을 종료했고, DB 커넥션 사용량을 43개까지 낮췄습니다. 이후 각 애플리케이션의 HikariCP 최대 풀 크기를 3개로 조정하고, 환경변수로 관리할 수 있도록 변경해 운영 환경에 따라 커넥션 수를 조절할 수 있도록 했습니다.",
      "스테이지 환경의 사용자 데이터 삭제 사고 복구",
      "스테이지 환경에서 WHERE 조건 없이 DELETE 쿼리를 실행하는 실수로 사용자 데이터를 삭제되어 테스트에 문제가 생겼습니다.",
      "다행히 MySQL binlog 파일이 남아있어 이를 활용해 삭제된 데이터를 복구했습니다.",
      "프로젝트 결과",
      "문서가 없던 기존 구조를 분석하여 도메인 별 역할 문서화",
      "애플리케이션 11개 → 7개로 축소",
      "Outbox 기반 이벤트 처리, 게이트웨이·서킷 브레이커, 인증 보안 정책 구현",
      "MySQL binlog를 활용한 스테이지 사용자 데이터 복구",
      "팀원 부재로 배포·서비스 관리 업무 인수",
      "회고",
      "셋이었던 팀이 둘로 줄어드는 상황 속에서도 침착하게 업무를 인수하고, 복잡한 아키텍처를 이해하기 위해 노력한 프로젝트였습니다. 장기적으로 이어지는 프로젝트인 만큼 단순히 기능이 돌아간다만 확인하지 않고, 프로젝트의 전체 구조와 도메인을 이해하고 개발할 수 있게 했습니다.",
      "스테이지 환경에서 발생한 데이터 삭제는 제 실수였습니다. MySQL binlog로 복구할 수 있었지만, 백업과 복구 절차를 사고 전에 준비해야 한다는 점을 체감했습니다. 향후 조회용 계정과 데이터 변경용 계정을 분리해 작업 목적에 맞게 권한을 제한하고, 백업·복구 절차를 마련해 실수로 인한 피해를 줄이고자 합니다."
    ]
  },
  {
    "file": "hear.html",
    "lines": [
      "Hear",
      "https://github.com/MoDeep11/Hear_BE",
      "2026.02.13 ~ 4.14",
      "팀 프로젝트 (7명, Backend 1, Frontend 2, AI-Engineer 3, Web-Design 1)",
      "AI와 대화하며 하루를 돌아보고, 일기로 남기는 AI 다이어리 서비스",
      "Hear는 하루를 돌아보고 기록하고 싶은 사용자를 위한 다이어리 서비스입니다. AI와 함께 하루를 회고하고, 회고 내용을 바탕으로 일기를 자동으로 작성해 주는 기능을 지원합니다.",
      "기술 스택",
      "Kotlin Spring Boot WebClient Kotlin Coroutines PostgreSQL Redis Docker GitHub Actions AWS EC2/S3",
      "주요 기능",
      "AI 채팅: 하루 회고 및 일기에 작성할 내용을 추출하는 기능",
      "AI 일기 작성: 회고 내용을 바탕으로 AI가 일기를 작성하는 기능",
      "월간 통계: 한 달간 작성한 일기의 감정 통계를 제공하고, AI 리포트를 제공하는 기능",
      "내가 맡은 역할",
      "서버 구조 설계",
      "클라이언트의 요청을 처리하는 Spring API 서버와 AI 처리 서버의 역할을 분리했습니다.",
      "Spring 서버가 AI 서버의 REST API를 호출하는 구조를 설계하고, WebClient와 Kotlin Coroutines로 비동기 통신을 구현했습니다.",
      "헥사고날 아키텍처 적용",
      "비즈니스 로직과 외부 연동 영역을 분리하기 위해 헥사고날 아키텍처를 적용했습니다.",
      "초기 구조를 설계하고 구성하는 데에 시간이 많이 소요됐지만, 외부 경계를 명확히 한 덕분에 외부 API가 갑자기 변경된 상황에서도 해당 영역만 교체하여 작업에 소요되는 시간을 줄였습니다.",
      "일기 작성 날짜를 관리하기 위한 데이터 모델 설계",
      "날짜 마스터 테이블과 일기 테이블 중간에 사용자 일기 작성 매핑 테이블을 두어 날짜와 일기 간의 N:M 관계를 해소하였으며, 사용자의 월간 통계 데이터를 처리할 수 있도록 설계했습니다.",
      "요청 추적 및 비동기 처리 개선",
      "요청 별 로그 추적을 위해 MDC 필터와 traceId를 적용했습니다",
      "비동기 실행 과정에서 발생하는 인증·로그 컨텍스트 전파 문제를 분석했습니다.",
      "문제 해결",
      "비동기 통신 환경에서 발견된 요청 컨텍스트 전파의 한계",
      "AI 서버와의 비동기 통신에 WebClient와 Kotlin Coroutines를 사용했습니다. 디버깅을 위해 MDC 필터로 traceId를 부여했지만, 비동기 실행 과정에서 SecurityContext와 MDC의 요청 컨텍스트가 유지되지 않는 문제를 발견했습니다.",
      "ThreadLocal의 전파 방식을 분석하고 SecurityContext 상속을 적용했지만, MDC 전파 및 스레드 재사용에 따른 컨텍스트 오염 가능성 등 해당 방식으로는 완전히 해결되지 않았다는 점을 알아냈습니다.",
      "임시 해결에 그치지 않고 AsyncTaskExecutor를 활용한 컨텍스트 전파 방식을 알아보며, 컨텍스트의 전파와 정리가 안정적으로 이루어질 수 있도록 구조를 재검토하고 리팩토링을 진행하고 있습니다.",
      "프로젝트 결과",
      "WebClient와 Kotlin Coroutines를 활용한 AI 서버 연동 구현",
      "MDC 필터와 traceId를 적용해 요청별 로그 추적 기반 마련",
      "컨텍스트 전파 실패와 스레드 재사용에 따른 잔존 위험 파악",
      "문제 분석을 바탕으로 리팩토링 과제 구체화",
      "회고",
      "외부 API 연동 방식이 프로젝트 도중 두 차례 바뀌었지만, 헥사고날 아키텍처로 외부 연동 영역을 분리해둔 덕분에 비즈니스 로직은 건드리지 않고 Adapter만 교체할 수 있었습니다.",
      "Springboot에서 비동기 처리는 실행 환경과 컨텍스트의 생명주기까지 고려해야 한다는 점을 배웠습니다. 단순 스레드 상속 설정만으로 컨텍스트 전파 문제를 해결했다고 판단해선 안된다는 것도 깨달았습니다.",
      "리팩토링에서는 동시 요청과 스레드 재사용 상황을 검증해, 요청별 컨텍스트가 정확하게 유지되고 정리되는지 확인할 계획입니다. 또한 향후 AI 채팅에 WebSocket을 적용해 응답을 생성 중에도 실시간으로 전달하여 클라이언트와의 통신 속도를 높이는 방법을 고려하고 있습니다."
    ]
  },
  {
    "file": "modev.html",
    "lines": [
      "MoDev",
      "https://github.com/MoDeep11/MoDev_BE",
      "2026.05.20 ~ 7.10",
      "팀 프로젝트 (6명, Backend 2, Frontend 2, AI-Engineer 1, Web-Design 1)",
      "개발의 시작을 돕는 프로젝트 초기 세팅 자동화 서비스",
      "MoDev는 초보 개발자가 복잡한 프로젝트 초기 설정과 의존성 버전 호환성 선택을 쉽게 진행할 수 있도록 돕는 서비스입니다.",
      "주 이용자는 대덕소프트웨어마이스터고등학교 1학년 학생과, 개발을 시작하고 싶지만 프로젝트 구성 방법에 어려움을 겪는 입문자입니다. 초기 환경 구성의 부담을 줄이고, 기능 개발을 설정 문제 없이 시작할 수 있도록 돕는 것이 목표입니다.",
      "기술 스택",
      "Kotlin Spring Boot python FastAPI PostgreSQL Redis Docker Nginx GitHub Actions AWS EC2/S3",
      "주요 기능",
      "프로젝트 초기 세팅 자동화: 개발을 시작할 때 필요한 프로젝트 구성 과정을 간소화",
      "의존성 버전 선택 지원: 의존성 간 버전 호환성을 고려한 선택을 지원해 설정 부담 완화",
      "AI 생성 진행 상황 표시: 생성 과정을 실시간으로 전달해 진행 상태 안내",
      "내가 맡은 역할",
      "패키지 정보 동기화 및 서버 구조 설계",
      "NPM, Maven Central, PyPI 등 7개 레지스트리의 메타데이터를 주기적으로 수집하는 스케줄러를 구현했습니다.",
      "Spring은 데이터 관리, FastAPI는 비동기 AI 연동을 담당하도록 분리하고, AI 응답 실패 시 사용자가 재시도를 선택하도록 설계했습니다.",
      "실시간 진행 상황 전달",
      "SSE로 AI 스케폴딩 진행 상황을 전송하고, heartbeat와 SseEmitter 종료 처리를 적용해 연결을 관리했습니다.",
      "테스트 및 코드 검사를 포함한 CI/CD 구축",
      "GitHub Actions에서 단위 테스트와 ktlint를 통과해야 배포되도록 구성했습니다. 변경되지 않은 모듈의 테스트 결과를 캐싱해 배포 시간을 최대 5분에서 약 100초로 단축했습니다.",
      "문제 해결",
      "AI 스케폴딩 진행 상황을 전달하는 SSE 연결 안정화",
      "AI 스케폴딩 진행 상황을 클라이언트에게 실시간 전달하기 위해 SSE를 적용했는데, SSE 연결이 Nginx 리버스 프록시의 타임아웃으로 끊기는 문제가 발생했습니다.",
      "단순 생성 상태를 보여주는 것뿐이었지만, 사용자가 AI 생성 상태를 알 수 없어 불편함이 발생할 수 있었습니다.",
      "AI 생성 작업 중 연결 종료를 방지하기 위해 heartbeat를 전송하고, 작업 종료 시 SseEmitter를 정리해 연결 자원이 남지 않도록 구성했습니다.",
      "프로젝트 결과",
      "7개 패키지 레지스트리의 메타데이터 수집·갱신 자동화",
      "SSE 기반 AI 생성 진행 상황 전송 및 연결 관리 구현",
      "사용자 선택에 따른 AI 재시도로 불필요한 자동 재호출 방지",
      "배포 시간 최대 5분 → 약 100초로 단축",
      "회고",
      "Nginx 리버스 프록시 타임아웃으로 끊기던 SSE 실시간 연결을 heartbeat 방식으로 안정화하며, AI 생성 진행 상황을 끊기지 않고 전달하도록 개선한 프로젝트입니다.",
      "AI 기능을 서비스에 연결할 때는 응답 생성뿐 아니라 대기 중 진행 상황, 실패 이후의 재시도 방식, API 비용까지 고려해야 한다는 점을 배웠습니다. 이에 따라 진행 상태는 SSE로 전달하고, AI 요청 실패 시에는 사용자가 재시도 여부를 선택하도록 설계했습니다.",
      "또한 실시간 통신은 애플리케이션 코드만으로 완성되지 않으며, 프록시 타임아웃과 연결 종료 시 자원 정리까지 함께 고려해야 한다는 점을 확인했습니다. CI/CD에서는 테스트를 생략하는 대신 변경되지 않은 모듈의 결과를 재사용해 검증 절차를 유지하면서 배포 시간을 줄였습니다."
    ]
  }
];
const plain = s => s.replace(/<img\b[^>]*alt="([^"]*)"[^>]*>/g, ' $1 ').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
for (const page of expected) {
 const html = fs.readFileSync(path.join(__dirname, page.file), 'utf8');
 const text = plain(html);
 for (const line of page.lines) assert.ok(text.replace(/\s+/g, '').includes(line.replace(/\s+/g, '')), page.file + ': source text missing: ' + line);
 const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size, ids.length, page.file + ': duplicate IDs');
}
for (const file of ['index.html', ...expected.map(p=>p.file)]) {
 const html = fs.readFileSync(path.join(__dirname,file),'utf8');
 for (const match of html.matchAll(/href="([^"]+)"/g)) {
  const href=match[1];
  if (/^(https?:|mailto:|data:)/.test(href)) continue;
  const [target,hash] = href.split('#');
  const destination = (target || file).split('?')[0];
  assert.ok(fs.existsSync(path.join(__dirname,destination)), file + ': broken local link: ' + href);
  if(hash) assert.ok(fs.readFileSync(path.join(__dirname,destination),'utf8').includes('id="'+hash+'"'), file + ': missing anchor: '+href);
 }
}
console.log('PASS: all Notion project text, local links, anchors, and unique IDs.');

assert.ok(plain(fs.readFileSync(path.join(__dirname,"entrydsm.html"),"utf8")).includes("커넥션 풀은 크게 설정할수록 좋은 것이 아니라, DB가 수용할 수 있는 전체 연결 수를 기준으로 설계해야 한다는 점을 배웠습니다. 개별 애플리케이션의 설정뿐 아니라 인스턴스 수와 DB를 사용하는 애플리케이션 수를 함께 고려해야 합니다. 앞으로는 배포 전에 전체 커넥션 사용량이 DB의 최대 연결 수를 넘지 않는지 확인하고, 운영 환경에 맞춰 풀 크기를 관리하겠습니다."));
