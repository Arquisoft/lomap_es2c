
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AddFriendAndAcceptRequest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:5000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*\.svg""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"If-None-Match" -> """W/"79f-LIU+VwjOm3QhGR+4QQi5U7PWcaw"""",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-Modified-Since" -> "Tue, 02 May 2023 11:59:30 GMT",
  		"If-None-Match" -> """W/"86c71-187dc54fd98""""
  )
  
  private val headers_2 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-Modified-Since" -> "Tue, 02 May 2023 11:59:30 GMT",
  		"If-None-Match" -> """W/"96df2-187dc54fd9c""""
  )
  
  private val headers_3 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"If-Modified-Since" -> "Tue, 02 May 2023 11:59:30 GMT",
  		"If-None-Match" -> """W/"293f-187dc54fd9f""""
  )
  
  private val headers_7 = Map(
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_8 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_9 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  		"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_48 = Map(
  		"If-None-Match" -> """W/"87-Ac43e4pFS8pBDRnHgBjxYLWX7CI"""",
  		"Origin" -> "http://localhost:3000"
  )
  
  private val headers_59 = Map("Origin" -> "http://localhost:3000")
  
  private val uri1 = "localhost"

  private val scn = scenario("AddFriendAndAcceptRequest")
    .exec(
      http("request_0")
        .get("http://" + uri1 + ":3000/")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get("http://" + uri1 + ":3000/1.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_1),
          http("request_2")
            .get("http://" + uri1 + ":3000/2.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_2),
          http("request_3")
            .get("http://" + uri1 + ":3000/4.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_3),
          http("request_4")
            .get("http://" + uri1 + ":3000/1.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_1),
          http("request_5")
            .get("http://" + uri1 + ":3000/2.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_2),
          http("request_6")
            .get("http://" + uri1 + ":3000/4.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_3)
        )
    )
    .pause(8)
    .exec(
      http("request_7")
        .options("/api/sesionmanager/login")
        .headers(headers_7)
        .resources(
          http("request_8")
            .post("/api/sesionmanager/login")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0008_request.json"))
        )
    )
    .pause(4)
    .exec(
      http("request_9")
        .get("http://" + uri1 + ":3000/home/welcome?code=c2bbd3d2ea42a3644b6a4ab8bbf35685&state=7ff7ff632ef447469cf5982e17512a47")
        .headers(headers_9)
        .resources(
          http("request_10")
            .get("http://" + uri1 + ":3000/1.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_1),
          http("request_11")
            .get("http://" + uri1 + ":3000/2.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_2),
          http("request_12")
            .get("http://" + uri1 + ":3000/4.png?w=164&h=164&fit=crop&auto=format")
            .headers(headers_3)
        )
    )
    .pause(1)
    .exec(
      http("request_13")
        .options("/api/friendmanager/friendrequests")
        .headers(headers_7)
        .resources(
          http("request_14")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0014_request.json"))
        )
    )
    .pause(2)
    .exec(
      http("request_15")
        .options("/api/friendmanager/friends")
        .headers(headers_7)
        .resources(
          http("request_16")
            .options("/api/friendmanager/friends")
            .headers(headers_7),
          http("request_17")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0017_request.json")),
          http("request_18")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0018_request.json")),
          http("request_19")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0019_request.json")),
          http("request_20")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0020_request.json")),
          http("request_21")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0021_request.json")),
          http("request_22")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0022_request.json")),
          http("request_23")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0023_request.json")),
          http("request_24")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0024_request.json")),
          http("request_25")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0025_request.json")),
          http("request_26")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0026_request.json")),
          http("request_27")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0027_request.json")),
          http("request_28")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0028_request.json"))
        )
    )
    .pause(1)
    .exec(
      http("request_29")
        .post("/api/friendmanager/friendrequests")
        .headers(headers_8)
        .body(RawFileBody("addfriendandacceptrequest/0029_request.json"))
        .resources(
          http("request_30")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0030_request.json")),
          http("request_31")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0031_request.json")),
          http("request_32")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0032_request.json"))
        )
    )
    .pause(1)
    .exec(
      http("request_33")
        .options("/api/friendmanager/updaterequest/1")
        .headers(headers_7)
        .resources(
          http("request_34")
            .post("/api/friendmanager/updaterequest/1")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0034_request.json")),
          http("request_35")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_36")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_37")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_38")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0038_request.json")),
          http("request_39")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0039_request.json")),
          http("request_40")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0040_request.json")),
          http("request_41")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0041_request.json")),
          http("request_42")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0042_request.json")),
          http("request_43")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0043_request.json")),
          http("request_44")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0044_request.json")),
          http("request_45")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0045_request.json")),
          http("request_46")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0046_request.json")),
          http("request_47")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0047_request.json")),
          http("request_48")
            .get("/api/usermanager/searchUserByUsername?username=guillepf")
            .headers(headers_48)
        )
    )
    .pause(2)
    .exec(
      http("request_49")
        .options("/api/friendmanager/friends")
        .headers(headers_7)
        .resources(
          http("request_50")
            .options("/api/friendmanager/friends")
            .headers(headers_7),
          http("request_51")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0051_request.json")),
          http("request_52")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0052_request.json")),
          http("request_53")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0053_request.json")),
          http("request_54")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0054_request.json"))
        )
    )
    .pause(17)
    .exec(
      http("request_55")
        .options("/api/friendmanager/friends")
        .headers(headers_7)
        .resources(
          http("request_56")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_57")
            .options("/api/friendmanager/friends")
            .headers(headers_7),
          http("request_58")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_59")
            .get("/api/usermanager/searchUserByUsername?username=teste2e")
            .headers(headers_59),
          http("request_60")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0060_request.json")),
          http("request_61")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0061_request.json")),
          http("request_62")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0062_request.json")),
          http("request_63")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0063_request.json")),
          http("request_64")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0064_request.json")),
          http("request_65")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0065_request.json")),
          http("request_66")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0066_request.json")),
          http("request_67")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0067_request.json")),
          http("request_68")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0068_request.json")),
          http("request_69")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0069_request.json")),
          http("request_70")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0070_request.json")),
          http("request_71")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0071_request.json")),
          http("request_72")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0072_request.json")),
          http("request_73")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0073_request.json")),
          http("request_74")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0074_request.json")),
          http("request_75")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0075_request.json"))
        )
    )
    .pause(2)
    .exec(
      http("request_76")
        .options("/api/friendmanager/add")
        .headers(headers_7)
    )
    .pause(17)
    .exec(
      http("request_78")
        .options("/api/usermanager/edit")
        .headers(headers_7)
        .resources(
          http("request_79")
            .post("/api/usermanager/edit")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0079_request.json")),
          http("request_80")
            .options("/api/friendmanager/friends")
            .headers(headers_7),
          http("request_81")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_82")
            .options("/api/friendmanager/friendrequests")
            .headers(headers_7),
          http("request_83")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0083_request.json")),
          http("request_84")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0084_request.json")),
          http("request_85")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0085_request.json")),
          http("request_86")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0086_request.json")),
          http("request_87")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0087_request.json")),
          http("request_88")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0088_request.json")),
          http("request_89")
            .post("/api/friendmanager/friendrequests")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0089_request.json")),
          http("request_90")
            .post("/api/friendmanager/friends")
            .headers(headers_8)
            .body(RawFileBody("addfriendandacceptrequest/0090_request.json"))
        )
    )

	setUp(scn.inject(constantUsersPerSec(10).during(15))).protocols(httpProtocol)
}
