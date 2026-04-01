from flask import render_template

def register_routes(app):

    @app.route('/')
    def index():
        return render_template('index.html', title='Home')

    @app.route('/contact')
    def contact():
        return render_template('contacts.html', title='Contact Me')

    @app.route('/resume')
    def resume():
        return render_template('resume.html', title='Resume')

    #@app.route('/resume')
    #def resume():
     #   try:
      #      return send_file('static/files/resume.pdf', as_attachment=True)
      #  except Exception:
      #      return redirect(url_for('resume'))