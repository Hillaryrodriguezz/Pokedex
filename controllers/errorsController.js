export const Get404 = (req, res, next) => {
    res.status(404).render('./errors/404', {
        title: '404',
        message: 'Sorry, the page you are looking for does not exist.',
        url: 'https://assets.pokemon.com/static2/_ui/img/global/psyduck.png'
    });
}