var Request = function (type, url, content, info, content_type) {
  content_type = content_type || "application/json";

  var imports = new JavaImporter(java.net, java.io);
  try {
    with(imports) {
      //info authenticates in format {'user': x, 'pass': y}
      if (info != null && info.user != null && info.pass != null){
        print("auth happening");
        auth = new Authenticator({
          "getPasswordAuthentication": function() {
            return new PasswordAuthentication(info.user, info.pass.toCharArray())
          }
        });

        Authenticator.setDefault(auth);
      }

      site = new URL(url);
      conn = site.openConnection();
      conn.setDoOutput(true);
      conn.setDoInput(true);
      conn.setRequestMethod(type);
      conn.setRequestProperty("Content-Type", content_type);

      output = conn.getOutputStream();
      input = new BufferedReader(new InputStreamReader(conn.getInputStream()));

      if (content !== undefined && content !== null) output.write(content);

      var out = input.readLine();
      if(content_type != "application/json") while(tmp = input.readLine()) out += tmp;
      return out;
    }
  } catch (e) {
    print(e);
  }
}
