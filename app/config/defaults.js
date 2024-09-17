
// module.exports = {
//     // db:{
//         username: 'postgres',
//         password: 'root',
//         database: 'portfolio',
//         host: '127.0.0.1',
//         port: 5432,
//         dialect: 'postgres',
//         logging: (log) => {
//             console.log('\n--------------------Start---------------------\n');
//             console.log(log);
//             console.log('\n---------------------End----------------------\n');
//         // },
//     },
//     // add new 
//     test: {
//         username: 'postgres',
//         password: 'root',
//         database: 'database_test',
//         host: '127.0.0.1',
//         dialect: 'postgres',
//     },
//     production: {
//         username: 'postgres',
//         password: 'root',
//         database: 'database_production',
//         host: '127.0.0.1',
//         dialect: 'postgres',
//     },
//     port: process.env.PORT || 5002,
//     pm2: {
//         name: process.env.PM2_NAME || 'portfolio_staging',
//         instances: 1,
//         watch: true,
//     },
//     baseUrl: 'http://localhost:5002/'
   
// };




module.exports = {
    development: {
        POSTGRES_URL:"postgres://default:TzuqoIAHE28F@ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
        POSTGRES_PRISMA_URL:"postgres://default:TzuqoIAHE28F@ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
        POSTGRES_URL_NO_SSL:"postgres://default:TzuqoIAHE28F@ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech:5432/verceldb",
        POSTGRES_URL_NON_POOLING:"postgres://default:TzuqoIAHE28F@ep-ancient-smoke-a4thmd5w.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
        POSTGRES_USER:"default",
        POSTGRES_HOST:"ep-ancient-smoke-a4thmd5w-pooler.us-east-1.aws.neon.tech",
        POSTGRES_PASSWORD:"TzuqoIAHE28F",
        POSTGRES_DATABASE:"verceldb",
            dialect: 'postgres',
            logging: (log) => {
                console.log('\n--------------------Start---------------------\n');
                console.log(log);
                console.log('\n---------------------End----------------------\n');

        },
    },
    port: process.env.PORT || 5002,
    pm2: {
        name: process.env.PM2_NAME || 'portfolio_staging',
        instances: 1,
        watch: true,
    },
    baseUrl: 'http://localhost:5002/',
    
};
